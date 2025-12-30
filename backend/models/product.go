package models

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	Name         string  `json:"name" gorm:"not null"`
	Desccription string  `json:"description"`
	Price        float64 `json:"price" gorm:"not null"`
	Stock        int     `json:"stock" gorm:"not null"`
	UserID       string  `json:"user_id"`
	User         User    `json:"-" gorm:"foreignKey:UserID"`
}
