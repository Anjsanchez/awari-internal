using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addedColumnsInRoomTbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "maximumCapacity",
                table: "Rooms",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "minimumCapacity",
                table: "Rooms",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "maximumCapacity",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "minimumCapacity",
                table: "Rooms");
        }
    }
}
