using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class SeedTblSettings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "SystemSettings",
                columns: new[] { "_id", "name", "value" },
                values: new object[,]
                {
                    { Guid.NewGuid(), "slipNo Sequence","1" },
                    { Guid.NewGuid(), "slipNo Date", DateTime.Now.ToString()},
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
