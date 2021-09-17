using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addedIsPrinted : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isPrinted",
                table: "ReservationTransLines",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isPrinted",
                table: "ReservationTransLines");
        }
    }
}
