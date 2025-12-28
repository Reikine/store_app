package models

import (
	"time"
)

type User struct {
	ID             string    `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	Name           string    `json:"name"`
	Email          string    `gorm:"unique;not null" json:"email"`
	HashedPassword string    `gorm:"not null" json:"-"`
	Role           string    `gorm:"default:CUSTOMER" json:"role"`
	CreatedAt      time.Time `json:"createdAt"`
	UpdatedAt      time.Time `json:"updatedAt"`
}
