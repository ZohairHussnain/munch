package munch.backend.servlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Part;
import munch.backend.dao.MenuDAO;
import munch.backend.model.MenuItem;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Path;

@WebServlet("/manager/editmenu")
@MultipartConfig //allows us to read the formdata obj js sends us
public class EditManagerMenu extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        int id = Integer.parseInt(request.getParameter("id"));
        int category = Integer.parseInt(request.getParameter("category"));
        String name = request.getParameter("name");
        double price = Double.parseDouble(request.getParameter("price"));


        //image handling logic
        Part imagePart = request.getPart("image");
        String fileName = Path.of(imagePart.getSubmittedFileName()).getFileName().toString();
        String uploadDir = getServletContext().getRealPath("/uploads");


        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        imagePart.write(uploadDir + File.separator + fileName);
        //

        MenuItem item = new MenuItem(id, name, price, category, fileName);
        MenuDAO dao = new MenuDAO();
        try {
            dao.editItem(item);
            out.write("{\"status\": \"success\"}");
        } catch (Exception e){
            e.printStackTrace();
            out.write("{\"status\": \"error\", \"msg\": \"Server error\"}");
        }
    }
}
