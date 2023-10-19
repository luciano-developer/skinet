using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Identity;
public class AppIdentityDbContextSeed
{
    public static async Task SeedUsersAsync(UserManager<AppUser> userManager) 
    {
        if (!userManager.Users.Any())
        {
            AppUser user = new()
            {
                DisplayName = "bob",
                Email = "bob@test.com",
                UserName = "bob@test.com",
                Address = new()
                {
                    FirstName = "Bob",
                    LastName = "Bobty",
                    Street = "10 the street",
                    City = "New York",
                    State = "NY",
                    ZipCode = "90210"
                }
            };

            await userManager.CreateAsync(user,"Pa$$w0rd");
        }
    }
}
