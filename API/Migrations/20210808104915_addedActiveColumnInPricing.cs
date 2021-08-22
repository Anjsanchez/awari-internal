using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addedActiveColumnInPricing : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isActive",
                table: "RoomPricings",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isActive",
                table: "RoomPricings");
        }
    }
}
