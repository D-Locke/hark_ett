using Microsoft.EntityFrameworkCore;
// using Npgsql.EntityFrameworkCore.PostgreSQL;
using hark_ett.Data;

var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins"; 
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>  
{  
    options.AddPolicy(name: MyAllowSpecificOrigins,  
                      policy  =>  
                      {  
                          policy.WithOrigins("https://localhost:44456","https://localhost:7129"); // add the allowed origins  
                      });  
});  

// Add services to the container.
builder.Services.AddDbContext<MyDBContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("PSQLConnection")));
// builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddControllersWithViews();


 

var app = builder.Build();



// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

//app.UseAuthentication();
//app.UseAuthorization();

app.UseCors(MyAllowSpecificOrigins);


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");;

app.Run();
