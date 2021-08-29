using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addedRemark : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "mattress",
                table: "ReservationRoomLines",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "remark",
                table: "ReservationRoomLines",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "mattress",
                table: "ReservationRoomLines");

            migrationBuilder.DropColumn(
                name: "remark",
                table: "ReservationRoomLines");
        }
    }
}
