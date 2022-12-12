using System;
using BC = BCrypt.Net.BCrypt;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class seedUserWithActive : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                                  table: "Users",
                                  columns: new[] { "Id", "Username", "EmailAddress", "FirstName", "LastName", "Password", "isExportFlag", "RoleId", "isActive" },
                                  values: new object[,]
                                  {
                                { new Guid("29b57807-0bae-4149-9a6e-c7e369fa4dfe"), "anj","anj@gmail.com", "Angelo", "Sanchez",  BC.HashPassword("123qq"), "0", "6f3cc6d8-5575-42ed-ac18-264e3f5e26e1",true},
                                { new Guid("EE9BF2B0-BA77-438F-BC7D-DCE0DB8A13C0"), "pat","pat@gmail.com", "Patricia", "Sanchez",  BC.HashPassword("123qq"), "0", "6f3cc6d8-5575-42ed-ac18-264e3f5e26e1" ,true}
                                  });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
