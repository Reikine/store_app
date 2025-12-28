package controllers

import (
	"fmt"
	"marketplace-backend/config"
	"marketplace-backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func Register(c *gin.Context) {
	var input struct {
		Name     string `json:"name"`
		Email    string `json:"email"`
		Password string `json:"password"`
		Role     string `json:"role"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Data tidak lengkap"})
		return
	}

	hashed, _ := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	newUser := models.User{
		Name:           input.Name,
		Email:          input.Email,
		HashedPassword: string(hashed),
		Role:           input.Role,
	}

	if err := config.DB.Create(&newUser).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Email sudah terdaftar"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Regristasi Berhasil"})
}

func Login(c *gin.Context) {
	var input struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(400, gin.H{"error": "Input tidak valid"})
		return
	}

	var user models.User
	if err := config.DB.Where("email = ?", input.Email).First(&user).Error; err != nil {
		c.JSON(401, gin.H{"error": "Email atau password salah"})
		return
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.HashedPassword), []byte(input.Password))
	if err != nil {
		c.JSON(401, gin.H{"error": "Email atau password salah"})
		return
	}
	c.JSON(200, gin.H{
		"message": "Login Berhasil",
		"user":    user,
		"token":   "dummy-token",
	})
	fmt.Printf("DEBUG: Login attempt for Email: %s with Pass: %s\n", input.Email, input.Password)
}
