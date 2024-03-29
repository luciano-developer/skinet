﻿using System.ComponentModel.DataAnnotations;

namespace API.Dto;
public class RegisterDto
{
    [Required]
    public string DisplayName { get; set; }

    [Required]
    public string Email { get; set; }

    [Required]
    [RegularExpression("(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$", 
        ErrorMessage ="Password must have 1 uppercase, 1 lowercase, 1 number, 1 non alphanumeric and at least 6 characteres")]
    public string Password { get; set; }
}

