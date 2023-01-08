using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class InventoryUnitInMaster : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "InventoryUnit_id",
                table: "InventoryMaster",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ProductUnitId",
                table: "InventoryMaster",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_InventoryMaster_InventoryUnit_id",
                table: "InventoryMaster",
                column: "InventoryUnit_id");

            migrationBuilder.AddForeignKey(
                name: "FK_InventoryMaster_InventoryUnits_InventoryUnit_id",
                table: "InventoryMaster",
                column: "InventoryUnit_id",
                principalTable: "InventoryUnits",
                principalColumn: "_id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InventoryMaster_InventoryUnits_InventoryUnit_id",
                table: "InventoryMaster");

            migrationBuilder.DropIndex(
                name: "IX_InventoryMaster_InventoryUnit_id",
                table: "InventoryMaster");

            migrationBuilder.DropColumn(
                name: "InventoryUnit_id",
                table: "InventoryMaster");

            migrationBuilder.DropColumn(
                name: "ProductUnitId",
                table: "InventoryMaster");
        }
    }
}
