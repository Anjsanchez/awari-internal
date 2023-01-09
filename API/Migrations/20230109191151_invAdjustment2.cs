using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class invAdjustment2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "InventoryLocation",
                table: "InventoryAdjustmentLines",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InventoryLocation",
                table: "InventoryAdjustmentLines");
        }
    }
}
