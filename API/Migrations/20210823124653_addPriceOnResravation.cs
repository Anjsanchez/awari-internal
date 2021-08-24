using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addPriceOnResravation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "grossAmount",
                table: "ReservationRoomLines",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "totalAmount",
                table: "ReservationRoomLines",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "totalDiscount",
                table: "ReservationRoomLines",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "grossAmount",
                table: "ReservationRoomLines");

            migrationBuilder.DropColumn(
                name: "totalAmount",
                table: "ReservationRoomLines");

            migrationBuilder.DropColumn(
                name: "totalDiscount",
                table: "ReservationRoomLines");
        }
    }
}
