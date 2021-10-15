using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class SeedTblProductTypes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
table: "ProductTypes",
columns: new[] { "_id", "name" },
values: new object[,]
{
                    { new Guid("5f79348b-1d63-53d3-90cc-63a5f2cb26c4"), "Corkage" },
                    { new Guid("bf8e4f15-c192-5b3e-8d40-d75d91231542"), "Items" },
                    { new Guid("bf8e4f15-c192-5c6a-8d40-d75c91231542"), "Complimentary" }
});

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
