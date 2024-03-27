from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.forms import UserChangeForm
from django.contrib.auth.models import User
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Submit
from django.contrib.auth.forms import AuthenticationForm


class RegistrationForm(UserCreationForm):
    email = forms.EmailField()

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']

    def __init__(self, *args, **kwargs):
        super(RegistrationForm, self).__init__(*args, **kwargs)
        placeholders = {
            'username': 'Username',
            'email': 'Email',
            'password1': 'Password',
            'password2': ' Confirm password',
        }
        for field_name in ['email', 'username', 'password1', 'password2']:
            self.fields[field_name].label = False
            self.fields[field_name].help_text = ''
            self.fields[field_name].widget.attrs['placeholder'] = placeholders[field_name]

        self.helper = FormHelper()
        self.helper.form_method = 'post'

class LoginForm(AuthenticationForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].widget.attrs.update({'class': 'form-control with-icon', 'placeholder': 'Username'})
        self.fields['password'].widget.attrs.update({'class': 'form-control with-icon', 'placeholder': 'Password'})

class ProfUpdate(UserChangeForm):
    class Meta:
        model = User
        fields = ['username', 'email']

    def __init__(self, *args, **kwargs):
        super(ProfUpdate, self).__init__(*args, **kwargs)
        placeholders = {
            'username': 'Username',
            'email': 'Email',
        }
        for field_name in ['username', 'email']:
            self.fields[field_name].label = False
            self.fields[field_name].help_text = ''
            self.fields[field_name].widget.attrs['placeholder'] = placeholders[field_name]

