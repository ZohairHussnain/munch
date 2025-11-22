package munch.backend.dao;

import munch.backend.model.MenuItem;
import munch.backend.util.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class MenuDAO {
    public void addItem(MenuItem item) throws Exception{

        String query = "INSERT INTO menu_items (cat_id, name, price, image_url) VALUES (?, ?, ?, ?)";
        Connection conn = DBConnection.getConnection();

        PreparedStatement ps = conn.prepareStatement(query);

        ps.setInt(1, item.getCategory());
        ps.setString(2, item.getName());
        ps.setDouble(3, item.getPrice());
        ps.setString(4, item.getImage());

        ps.executeUpdate();
        conn.close();
    }

    public List<MenuItem> getItemsbyCategory(int category) throws Exception{
        Connection conn = DBConnection.getConnection();

        String query = "SELECT * FROM menu_items WHERE cat_id = ?";
        PreparedStatement ps = conn.prepareStatement(query);
        ps.setInt(1, category);

        ResultSet rs = ps.executeQuery();
        List<MenuItem> list = new ArrayList<>();

        while (rs.next()) {
            MenuItem item = new MenuItem(
                    rs.getInt("id"),
                    rs.getString("name"),
                    rs.getDouble("price"),
                    rs.getInt("cat_id"),
                    rs.getString("image_url")
            );
            list.add(item);
        }

        conn.close();
        return list;
    }
    //for recipt
    public List<MenuItem> getItemsByIds(List<Integer> ids) throws Exception {

        if (ids == null || ids.isEmpty()) return new ArrayList<>();

        //cuause strings are not mutable
        StringBuilder sql = new StringBuilder("SELECT * FROM menu_items WHERE id IN (");

        //generate ?,?,?
        for (int i = 0; i < ids.size(); i++) {
            sql.append("?");
            if (i < ids.size() - 1) sql.append(",");
        }
        sql.append(")");

        List<MenuItem> list = new ArrayList<>();

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql.toString())) {

            //for the ?
            for (int i = 0; i < ids.size(); i++) {
                stmt.setInt(i + 1, ids.get(i));
            }

            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                list.add(new MenuItem(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getDouble("price"),
                        rs.getInt("cat_id"),
                        rs.getString("image_url")
                ));
            }
        }

        return list;
    }

    public void editItem (MenuItem item) throws Exception{
        String query = "UPDATE menu_items SET cat_id = ?, name = ?, price = ?, image_url = ? WHERE id = ?";
        Connection conn = DBConnection.getConnection();

        PreparedStatement ps = conn.prepareStatement(query);
        ps.setInt(1, item.getCategory());
        ps.setString(2, item.getName());
        ps.setDouble(3, item.getPrice());
        ps.setString(4, item.getImage());
        ps.setInt(5, item.getId());  // which item to update

        ps.executeUpdate();
        conn.close();
    }
    public void deleteItem(MenuItem item) throws Exception{
        String query = "DELETE FROM menu_items WHERE id = ?";
        Connection conn = DBConnection.getConnection();

        PreparedStatement ps = conn.prepareStatement(query);
        ps.setInt(1, item.getId());

        ps.executeUpdate();
        conn.close();
    }
    //for testing
    public static void main(String[] args){
        MenuDAO dao = new MenuDAO();
        //1 starters 2 mains 3 desserts
        MenuItem item = new MenuItem("icecream", 104, 3, "test_food.webp");
        try {
            dao.addItem(item);
        } catch (Exception e){e.printStackTrace();}
    }
}
