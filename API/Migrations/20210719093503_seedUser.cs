using System;
using Microsoft.EntityFrameworkCore.Migrations;
using BC = BCrypt.Net.BCrypt;
namespace API.Migrations
{
    public partial class seedUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                             table: "Users",
                             columns: new[] { "Id", "Username", "EmailAddress", "FirstName", "LastName", "Password", "isExportFlag", "RoleId", "isActive" },
                             values: new object[,]
                             {
                                { Guid.NewGuid(), "anj","anj@gmail.com", "Angelo", "Sanchez",  BC.HashPassword("123"), "0", "6f3cc6d8-5575-42ed-ac18-264e3f5e26e1", "1"},
                                { Guid.NewGuid(), "pat","pat@gmail.com", "Patricia", "Sanchez",  BC.HashPassword("123"), "0", "6f3cc6d8-5575-42ed-ac18-264e3f5e26e1", "1"}
                             });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
