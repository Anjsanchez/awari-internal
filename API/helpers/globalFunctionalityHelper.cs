using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Migrations.Configurations;
using API.Models.reservation;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using static API.Models.Enum.EnumModels;

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

        public static EAction GetApprovalAction(string action)
        {
            var actionLower = action.ToLower();
            if (actionLower == "modify")
                return EAction.Modify;

            if (actionLower == "add")
                return EAction.Add;

            return EAction.Delete;

        }

        public static EApprovalType GetApprovalType(string type)
        {
            var typeInLower = type.ToLower();

            if (typeInLower == "payment")
                return EApprovalType.Payment;

            if (typeInLower == "rooms")
                return EApprovalType.Rooms;

            if (typeInLower == "headers")
                return EApprovalType.Header;


            return EApprovalType.Trans;
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

        public static int getTotalNumberOfGuests(List<ReservationRoomLine> roomData)
        {
            var totalGuest = 0;
            foreach (var item in roomData)
            {
                int totalHeads = item.adultPax + item.seniorPax;
                totalGuest += totalHeads;
            }

            return totalGuest;
        }

        public static int getTotalNumberOfRooms(List<ReservationRoomLine> roomData, string type)
        {
            if (type.ToLower() == "day tour" ||
                 type.ToLower() == "restaurant")
                return 0;

            return roomData.Count;
        }

        public static float getNetAmount(List<ReservationRoomLine> roomData, List<ReservationTransLine> linesData)
        {
            float netAmount = 0f;
            foreach (var item in roomData)
                netAmount += item.totalAmount;

            netAmount += getTotalLateCheckOut(roomData);

            foreach (var item in linesData)
                netAmount += item.quantity * item.product.sellingPrice - item.netDiscount;

            return netAmount;
        }


        public static float getTotalLateCheckOut(List<ReservationRoomLine> rooms)
        {

            double incrementFee = 0f;
            foreach (var item in rooms)
            {
                if (item.lateCheckOutPenalty == 0) continue;
                if (item.roomPricing == null) continue;

                var penaltyPercent = (double)item.lateCheckOutPenalty / 100;
                incrementFee += item.roomPricing.sellingPrice * penaltyPercent;
            }

            return (float)incrementFee;
        }

        public static float getGrossAmount(List<ReservationRoomLine> roomData, List<ReservationTransLine> linesData)
        {
            float grossAmount = 0f;
            foreach (var item in roomData)
                grossAmount += item.grossAmount;

            grossAmount += getTotalLateCheckOut(roomData);

            foreach (var item in linesData)
                grossAmount += item.quantity * item.product.sellingPrice;

            return grossAmount;
        }
        public static float getNetDiscount(List<ReservationRoomLine> roomData, List<ReservationTransLine> linesData)
        {
            float netDiscount = 0f;
            foreach (var item in roomData)
                netDiscount += item.totalDiscount;

            foreach (var item in linesData)
                netDiscount += item.netDiscount;

            return netDiscount;
        }


    }
}