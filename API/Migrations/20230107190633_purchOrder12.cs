using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class purchOrder12 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PurchaseOrderLines_Products_ProductId",
                table: "PurchaseOrderLines");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "PurchaseOrderLines",
                newName: "InventoryMasterId");

            migrationBuilder.RenameIndex(
                name: "IX_PurchaseOrderLines_ProductId",
                table: "PurchaseOrderLines",
                newName: "IX_PurchaseOrderLines_InventoryMasterId");

            migrationBuilder.AddForeignKey(
                name: "FK_PurchaseOrderLines_InventoryMaster_InventoryMasterId",
                table: "PurchaseOrderLines",
                column: "InventoryMasterId",
                principalTable: "InventoryMaster",
                principalColumn: "_id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PurchaseOrderLines_InventoryMaster_InventoryMasterId",
                table: "PurchaseOrderLines");

            migrationBuilder.RenameColumn(
                name: "InventoryMasterId",
                table: "PurchaseOrderLines",
                newName: "ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_PurchaseOrderLines_InventoryMasterId",
                table: "PurchaseOrderLines",
                newName: "IX_PurchaseOrderLines_ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_PurchaseOrderLines_Products_ProductId",
                table: "PurchaseOrderLines",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "_id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
