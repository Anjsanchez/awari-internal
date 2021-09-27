using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addedTransTotalRooms : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "totalNumberOfRooms",
                table: "TransHeaders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "totalNumberOfTrans",
                table: "TransHeaders",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "totalNumberOfRooms",
                table: "TransHeaders");

            migrationBuilder.DropColumn(
                name: "totalNumberOfTrans",
                table: "TransHeaders");
        }
    }
}
