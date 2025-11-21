package munch.backend.servlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import munch.backend.dao.MenuDAO;
import munch.backend.model.MenuItem;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Objects;

@WebServlet("/manager/loadmenu")
public class LoadManagerMenu extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        int cat=0;
        String category = request.getParameter("category");
        if (category == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.write("{\"error\": \"Category parameter is required\"}");
            return;
        }
        if(Objects.equals(category, "starters")){cat = 1;}
        else if(Objects.equals(category, "mains")){cat=2;}
        else if(Objects.equals(category, "desserts")){cat=3;}

        try {
            MenuDAO dao = new MenuDAO();
            List<MenuItem> items = dao.getItemsbyCategory(cat);

            String json = new Gson().toJson(items);
            out.write(json);

        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.write("{\"error\": \"Server error while loading items\"}");
        }



    }

}
