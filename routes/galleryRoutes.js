const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');

// GET all gallery items
router.get('/', galleryController.getAllGalleryItems);

// GET a single gallery item by ID
router.get('/:id', galleryController.getGalleryItemById);

// POST a new gallery item
router.post('/', galleryController.createGalleryItem);

// PUT (update) a gallery item
router.put('/:id', galleryController.updateGalleryItem);

// DELETE a gallery item
router.delete('/:id', galleryController.deleteGalleryItem);

// GET all gallery items that should be shown in hero slider
router.get('/hero-slider/items', galleryController.getHeroSliderItems);

// PATCH toggle hero slider status for a gallery item
router.patch('/:id/toggle-hero-slider', galleryController.toggleHeroSliderStatus);

module.exports = router;