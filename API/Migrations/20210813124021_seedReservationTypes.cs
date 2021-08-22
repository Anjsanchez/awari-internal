using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class seedReservationTypes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "ReservationTypes",
                columns: new[] { "_id", "name" },
                values: new object[,]
                {
                    { Guid.NewGuid(), "Walk In" },
                    { Guid.NewGuid(), "Online" },
                    { Guid.NewGuid(), "Restaurant" },
                    { Guid.NewGuid(), "Day Tour" },
                    { Guid.NewGuid(), "OTA/Travel Agency" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
