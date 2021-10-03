using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addAgencyInTrans : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "agency",
                table: "TransHeaders",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "agency",
                table: "TransHeaders");
        }
    }
}
