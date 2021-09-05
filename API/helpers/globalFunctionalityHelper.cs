using System;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Migrations.Configurations;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace API.helpers.api
{
    public static class globalFunctionalityHelper
    {
        public static string GenerateJwtToken(string jwtConfig)
        {

            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(jwtConfig);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]{
                        new Claim(JwtRegisteredClaimNames.Jti, "09054292526"),
                        new Claim("Username", "anj"),
                        new Claim("Fullname", "Angelo Sanchez"),
                    }),
                Expires = DateTime.UtcNow.AddHours(6),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = jwtTokenHandler.WriteToken(token);

            return jwtToken;
        }

        public static void DeleteImage(string imageName, string imgPath, IWebHostEnvironment _hostEnvironment)
        {
            var path = Path.Combine(_hostEnvironment.ContentRootPath, $"Images/{imgPath}/", imageName);
            if (System.IO.File.Exists(path)) System.IO.File.Delete(path);
        }

        public static async Task<string> SaveImage(IFormFile imageFile, string imgPath, IWebHostEnvironment hostEnvironment)
        {
            string imgName = new string(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imgName = imgName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(hostEnvironment.ContentRootPath, $"Images/{imgPath}/", imgName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }

            return imgName;

        }
    }
}