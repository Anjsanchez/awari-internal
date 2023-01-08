using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class InventoryUnitInMasterUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.RenameColumn(
                name: "ProductUnitId",
                table: "InventoryMaster",
                newName: "InventoryUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_InventoryMaster_InventoryUnitId",
                table: "InventoryMaster",
                column: "InventoryUnitId");

            migrationBuilder.AddForeignKey(
                name: "FK_InventoryMaster_InventoryUnits_InventoryUnitId",
                table: "InventoryMaster",
                column: "InventoryUnitId",
                principalTable: "InventoryUnits",
                principalColumn: "_id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InventoryMaster_InventoryUnits_InventoryUnitId",
                table: "InventoryMaster");

            migrationBuilder.DropIndex(
                name: "IX_InventoryMaster_InventoryUnitId",
                table: "InventoryMaster");

            migrationBuilder.RenameColumn(
                name: "InventoryUnitId",
                table: "InventoryMaster",
                newName: "ProductUnitId");

            migrationBuilder.AddColumn<Guid>(
                name: "InventoryUnit_id",
                table: "InventoryMaster",
                type: "uniqueidentifier",
                nullable: true);

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
    }
}
