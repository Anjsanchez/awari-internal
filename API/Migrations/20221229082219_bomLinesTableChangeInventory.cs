using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class bomLinesTableChangeInventory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BomLines_Products_LineId",
                table: "BomLines");

            migrationBuilder.AddForeignKey(
                name: "FK_BomLines_InventoryMaster_LineId",
                table: "BomLines",
                column: "LineId",
                principalTable: "InventoryMaster",
                principalColumn: "_id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BomLines_InventoryMaster_LineId",
                table: "BomLines");

            migrationBuilder.AddForeignKey(
                name: "FK_BomLines_Products_LineId",
                table: "BomLines",
                column: "LineId",
                principalTable: "Products",
                principalColumn: "_id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
