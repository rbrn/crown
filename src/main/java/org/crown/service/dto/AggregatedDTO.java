package org.crown.service.dto;

import java.util.List;

public class AggregatedDTO<T> {
    protected Long countItems;

    public Long getCountItems() {
        return countItems;
    }

    public void setCountItems(Long countItems) {
        this.countItems = countItems;
    }

    public String getItemType() {
        return itemType;
    }

    public void setItemType(String itemType) {
        this.itemType = itemType;
    }

    public List<T> getItemTypesList() {
        return itemTypesList;
    }

    public void setItemTypesList(List<T> itemTypesList) {
        this.itemTypesList = itemTypesList;
    }

    protected String itemType;
    protected List<T> itemTypesList;
}
