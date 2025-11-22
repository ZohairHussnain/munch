package munch.backend.servlets;

import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import munch.backend.dao.MenuDAO;
import munch.backend.model.MenuItem;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/customer/getitems")
public class GetItemsCustomerReciept extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        String idsParam = request.getParameter("ids");

        // split the csv
        String[] parts = idsParam.split(",");

        List<Integer> idList = new ArrayList<>();
        //convert to int
        for (String p : parts) {
            try {
                idList.add(Integer.parseInt(p.trim()));
            } catch (NumberFormatException e) {
                // ignore invalid part
            }
        }

        if (idList.isEmpty()) {
            out.write("[]");
            return;
        }

        try {
            MenuDAO dao = new MenuDAO();
            List<MenuItem> items = dao.getItemsByIds(idList);

            Gson gson = new Gson();
            out.write(gson.toJson(items));

        } catch (Exception e) {
            e.printStackTrace();
            out.write("[]");
        }
    }


}

