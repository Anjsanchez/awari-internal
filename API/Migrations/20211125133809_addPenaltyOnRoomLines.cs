using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addPenaltyOnRoomLines : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "lateCheckOutPenalty",
                table: "ReservationRoomLines",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "lateCheckOutPenalty",
                table: "ReservationRoomLines");
        }
    }
}
