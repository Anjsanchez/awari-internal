using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class invmaster2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AdjustmentType",
                table: "InventoryAdjustments",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdjustmentType",
                table: "InventoryAdjustments");
        }
    }
}
