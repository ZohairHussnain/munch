package munch.backend.dao;

import munch.backend.model.MenuItem;
import munch.backend.util.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class MenuDAO {
    public void addItem(MenuItem item) throws Exception{

        String query = "INSERT INTO menu_items (name, price, category, image) VALUES (?, ?, ?, ?)";
        Connection conn = DBConnection.getConnection();

        PreparedStatement ps = conn.prepareStatement(query);

        ps.setString(1, item.getName());
        ps.setDouble(2, item.getPrice());
        ps.setString(3, item.getCategory());
        ps.setString(4, item.getImage());

        ps.executeUpdate();
        conn.close();
    }

    public List<MenuItem> getItemsbyCategory(String category) throws Exception{
        Connection conn = DBConnection.getConnection();

        String query = "SELECT * FROM menu_items WHERE category = ?";
        PreparedStatement ps = conn.prepareStatement(query);
        ps.setString(1, category);

        ResultSet rs = ps.executeQuery();
        List<MenuItem> list = new ArrayList<>();

        while (rs.next()) {
            MenuItem item = new MenuItem(
                    rs.getInt("id"),
                    rs.getString("name"),
                    rs.getDouble("price"),
                    rs.getString("category"),
                    rs.getString("image")
            );
            list.add(item);
        }

        conn.close();
        return list;
    }
    public void editItem (MenuItem item) throws Exception{

    }
    public void deleteItem(MenuItem item) throws Exception{

    }
    //for testing
    public static void main(String[] args){
        MenuDAO dao = new MenuDAO();
        MenuItem item = new MenuItem("pizza", 12.3, "Starters", "...");
        try {
            dao.addItem(item);
        } catch (Exception e){e.printStackTrace();}
    }
}
