package controllers

import (
	"fmt"
	"marketplace-backend/config"
	"marketplace-backend/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

var secretKey = []byte("watashiwawibuomaewanani")

func GenerateToken(userID string, role string) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userID,
		"role":    role,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(secretKey)
}

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

	token, err := GenerateToken(user.ID, user.Role)
	if err != nil {
		fmt.Println("Debug JWT", err)
		c.JSON(500, gin.H{"error": "Gagal buat token"})
		return
	}
	c.JSON(200, gin.H{
		"message": "Login Berhasil",
		"user": gin.H{
			"id":    user.ID,
			"name":  user.Name,
			"email": user.Email,
			"role":  user.Role,
		},
		"token": token,
	})
	fmt.Printf("DEBUG: Login attempt for Email: %s with Pass: %s\n", input.Email, input.Password)
}
