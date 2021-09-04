using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class seedProductType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
         table: "ProductTypes",
         columns: new[] { "_id", "name" },
         values: new object[,]
         {
                    { new Guid("6f3cc6d8-5575-51ed-ac18-264e3f5e26e1"), "Appetizers" },
                    { new Guid("10f269ed-f71a-5a0c-8b6d-33e3f9fe4f31"), "À la carte" },
                    { new Guid("d3bc4e7a-db7b-52fa-a73e-f1e1d907898c"), "Family style" },
                    { new Guid("5f79348b-1d63-53d3-90cc-63a5f2bb26c4"), "Desserts" },
                    { new Guid("bf8e4f15-c192-5b3e-8d40-d75c91231542"), "Beverages" },
                    { new Guid("bf8e4f15-c192-5b6a-8d40-d75c91231542"), "Activity" }
         });

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
