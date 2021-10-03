using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class seedTravelAgency : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "TravelAgencies",
                columns: new[] { "_id", "name" },
                values: new object[,]
                {
                    { new Guid("6f3cc6d8-5575-42ed-ac18-264e3f5e26e2"), "Agoda" },
                    { new Guid("10f269ed-f71a-4b0c-8b6d-33e3f9fe4f32"), "Hotel Link" },
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
