using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addedColumnForadults : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "pax",
                table: "ReservationRoomLines",
                newName: "seniorPax");

            migrationBuilder.AddColumn<int>(
                name: "adultPax",
                table: "ReservationRoomLines",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "childrenPax",
                table: "ReservationRoomLines",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "adultPax",
                table: "ReservationRoomLines");

            migrationBuilder.DropColumn(
                name: "childrenPax",
                table: "ReservationRoomLines");

            migrationBuilder.RenameColumn(
                name: "seniorPax",
                table: "ReservationRoomLines",
                newName: "pax");
        }
    }
}
