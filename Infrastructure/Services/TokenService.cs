using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services;
public class TokenService : ITokenService
{
    private readonly IConfiguration configuration;
    private readonly SymmetricSecurityKey key;
    public TokenService(IConfiguration configuration)
    {
        this.configuration = configuration;
        key = new(Encoding.UTF8.GetBytes(configuration["Token:Key"]));
    }

    public string CreateToken(AppUser user)
    {
        List<Claim> claims = new()
        {
         new Claim(ClaimTypes.Email, user.Email),
         new Claim(ClaimTypes.GivenName, user.DisplayName)
        };

        var creeds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        SecurityTokenDescriptor tokenDescriptor = new()
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(7),
            SigningCredentials = creeds,
            Issuer = configuration["Token:Issuer"]
        };

        JwtSecurityTokenHandler tokenHandler = new();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}
