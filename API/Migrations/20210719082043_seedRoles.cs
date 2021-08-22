using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class seedRoles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Rolename" },
                values: new object[,]
                {
                    { new Guid("6f3cc6d8-5575-42ed-ac18-264e3f5e26e1"), "Administrator" },
                    { new Guid("10f269ed-f71a-4b0c-8b6d-33e3f9fe4f31"), "Bay Front" },
                    { new Guid("d3bc4e7a-db7b-49fa-a73e-f1e1d907898c"), "Front Desk" },
                    { new Guid("5f79348b-1d63-42d3-90cc-63a5f2bb26c4"), "Kitchen" },
                    { new Guid("bf8e4f15-c192-4d3e-8d40-d75c91231542"), "Manager" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
