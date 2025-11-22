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

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Path;

@WebServlet("/manager/deletemenu")
@MultipartConfig //allows us to read the formdata obj js sends us
public class DeleteManagerMenu extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        int id = Integer.parseInt(request.getParameter("id"));


        MenuItem item = new MenuItem(id, null, 0, 0, null);
        MenuDAO dao = new MenuDAO();
        try {
            dao.deleteItem(item);
            out.write("{\"status\": \"success\"}");
        } catch (Exception e){
            e.printStackTrace();
            out.write("{\"status\": \"error\", \"msg\": \"Server error\"}");
        }

    }
}
