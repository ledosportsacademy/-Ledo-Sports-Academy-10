const Gallery = require('../models/Gallery');

// Get all gallery items
exports.getAllGalleryItems = async (req, res) => {
  try {
    const galleryItems = await Gallery.find().sort({ id: 1 });
    res.status(200).json(galleryItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single gallery item by ID
exports.getGalleryItemById = async (req, res) => {
  try {
    const galleryItem = await Gallery.findOne({ id: req.params.id });
    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.status(200).json(galleryItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new gallery item
exports.createGalleryItem = async (req, res) => {
  try {
    // Find the highest existing ID and increment by 1
    const highestIdItem = await Gallery.findOne().sort({ id: -1 });
    const newId = highestIdItem ? highestIdItem.id + 1 : 1;
    
    const newGalleryItem = new Gallery({
      ...req.body,
      id: newId
    });
    
    const savedGalleryItem = await newGalleryItem.save();
    res.status(201).json(savedGalleryItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a gallery item
exports.updateGalleryItem = async (req, res) => {
  try {
    const updatedGalleryItem = await Gallery.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedGalleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    
    res.status(200).json(updatedGalleryItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a gallery item
exports.deleteGalleryItem = async (req, res) => {
  try {
    const deletedGalleryItem = await Gallery.findOneAndDelete({ id: req.params.id });
    
    if (!deletedGalleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    
    res.status(200).json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all gallery items that should be shown in hero slider
exports.getHeroSliderItems = async (req, res) => {
  try {
    const heroSliderItems = await Gallery.find({ showInHeroSlider: true }).sort({ id: 1 });
    res.status(200).json(heroSliderItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle hero slider status for a gallery item
exports.toggleHeroSliderStatus = async (req, res) => {
  try {
    const galleryItem = await Gallery.findOne({ id: req.params.id });
    
    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    
    galleryItem.showInHeroSlider = !galleryItem.showInHeroSlider;
    const updatedItem = await galleryItem.save();
    
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};