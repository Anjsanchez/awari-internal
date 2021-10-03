using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addAgencyInHeader : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "agency",
                table: "ReservationHeaders",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "agency",
                table: "ReservationHeaders");
        }
    }
}
