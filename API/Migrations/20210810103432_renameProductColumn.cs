using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class renameProductColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_ProductCategories_ProductCategoryId",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "ProductCategoryId",
                table: "Products",
                newName: "productCategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Products_ProductCategoryId",
                table: "Products",
                newName: "IX_Products_productCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_ProductCategories_productCategoryId",
                table: "Products",
                column: "productCategoryId",
                principalTable: "ProductCategories",
                principalColumn: "_id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_ProductCategories_productCategoryId",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "productCategoryId",
                table: "Products",
                newName: "ProductCategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Products_productCategoryId",
                table: "Products",
                newName: "IX_Products_ProductCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_ProductCategories_ProductCategoryId",
                table: "Products",
                column: "ProductCategoryId",
                principalTable: "ProductCategories",
                principalColumn: "_id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
