using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addedPrinterName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "printerName",
                table: "ProductCategories",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "printerName",
                table: "ProductCategories");
        }
    }
}
