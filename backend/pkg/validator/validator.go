package validator

import "github.com/go-playground/validator/v10"

var validate *validator.Validate

func Init() {
	validate = validator.New()
}

func Validate(obj any) error {
	if err := validate.Struct(obj); err != nil {
		return err
	}
	return nil
}
