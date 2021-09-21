using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class floatNumbers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "grossAmount",
                table: "TransHeaders",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "netAmount",
                table: "TransHeaders",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "netDiscount",
                table: "TransHeaders",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<int>(
                name: "totalNumberOfGuest",
                table: "TransHeaders",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "grossAmount",
                table: "TransHeaders");

            migrationBuilder.DropColumn(
                name: "netAmount",
                table: "TransHeaders");

            migrationBuilder.DropColumn(
                name: "netDiscount",
                table: "TransHeaders");

            migrationBuilder.DropColumn(
                name: "totalNumberOfGuest",
                table: "TransHeaders");
        }
    }
}
