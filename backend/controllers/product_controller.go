package controllers

import (
	"marketplace-backend/config"
	"marketplace-backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateProduct(c *gin.Context) {
	var product models.Product

	if err := c.ShouldBindJSON(&product); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	val, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "ID tidak ditemukan"})
		return
	}

	userIDString, ok := val.(string)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Format ID salah"})
		return
	}

	product.UserID = userIDString

	if err := config.DB.Create(&product).Error; err != nil {
		c.JSON(500, gin.H{"error": "Gagal menyimpan ke database"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Produk berhasil ditambahkan", "data": product})
}

func GetProducts(c *gin.Context) {
	var products []models.Product

	if err := config.DB.Preload("User").Find(&products).Error; err != nil {
		c.JSON(500, gin.H{"error": "Gagal memuat produk"})
		return
	}

	c.JSON(200, products)
}
