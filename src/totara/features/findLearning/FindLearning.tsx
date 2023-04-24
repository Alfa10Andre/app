/**
 * This file is part of Totara Enterprise.
 *
 * Copyright (C) 2021 onwards Totara Learning Solutions LTD
 *
 * Totara Enterprise is provided only to Totara Learning Solutions
 * LTD’s customers and partners, pursuant to the terms and
 * conditions of a separate agreement with Totara Learning
 * Solutions LTD or its affiliate.
 *
 * If you do not have an agreement with Totara Learning Solutions
 * LTD, you may not access, use, modify, or distribute this software.
 * Please contact [sales@totaralearning.com] for more information.
 */
import React, { useState, useEffect, useCallback } from "react";
import { FlatList, Image, ImageSourcePropType, Platform, Text, View } from "react-native";
import { SearchBar } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { translate } from "@totara/locale";
import { PLATFORM_ANDROID, PLATFORM_IOS } from "@totara/lib/constants";
import { learningItemEnum } from "@totara/features/constants";
import { LearningItemTile, LearningItemTileSkeleton } from "./components/LearningItemTile";
import { findLearningStyles } from "./findLearningStyles";
import { useNavigation } from "@react-navigation/native";
import { NAVIGATION } from "@totara/lib/navigation";
import { useLazyQuery } from "@apollo/client";
import { queryFindLearning, queryViewCatalog } from "./api";
import { CatalogItem, FindLearningPage } from "@totara/types/FindLearning";
import { FINDLEARNING_TEST_IDS } from "@totara/lib/testIds";
import { formatPageData, onSearch } from "./utils";
import { isEmpty } from "lodash";
import { Images } from "@resources/images";
import { MessageBar } from "@totara/components";

type FindLearningHeaderProps = {
  onChangeText: (text: string) => void;
  findLeaningText: string;
  onSearch: () => void;
  count?: number;
  onFocusText: () => void;
};

const FindLearningHeader = ({
  onChangeText,
  findLeaningText,
  onSearch,
  count,
  onFocusText
}: FindLearningHeaderProps) => {
  return (
    <View style={findLearningStyles.headerWrapper} testID={FINDLEARNING_TEST_IDS.HEADER}>
      <Text style={findLearningStyles.header}>{translate("find_learning.title")}</Text>
      <SearchBar
        placeholder={translate("find_learning.search")}
        onChangeText={onChangeText}
        value={findLeaningText}
        onSubmitEditing={onSearch}
        onFocus={onFocusText}
        platform={Platform.OS === PLATFORM_ANDROID ? PLATFORM_ANDROID : PLATFORM_IOS}
        onCancel={onSearch}
        returnKeyType="search"
        showCancel={true}
        cancelButtonTitle={translate("general.cancel")}
        containerStyle={findLearningStyles.searchBarContainer}
        inputContainerStyle={findLearningStyles.searchBar}
        inputStyle={findLearningStyles.searchBar}
        rightIconContainerStyle={findLearningStyles.clearSearch}
        testID={FINDLEARNING_TEST_IDS.SEARCH_TEXT_INPUT}
      />
      {count || (count === 0 && !isEmpty(findLeaningText)) ? (
        <Text style={findLearningStyles.result} testID={FINDLEARNING_TEST_IDS.NO_OF_ITEMS}>
          {translate("find_learning.results", {
            count
          })}
        </Text>
      ) : null}
    </View>
  );
};

const FindLearning = () => {
  const [searchResult, setSearchResult] = useState<FindLearningPage>();
  const [searchData, setSearchData] = useState<{ key: string; pointer?: number }>({ key: "", pointer: 0 });

  const navigation = useNavigation();
  const filterQuery =
    isEmpty(searchData.key) && searchData.pointer !== undefined ? queryViewCatalog : queryFindLearning;

  const [onCallSearch, { loading, data, error }] = useLazyQuery(filterQuery, {
    fetchPolicy: "no-cache"
  });

  useEffect(() => {
    if (data?.catalogPage) {
      const currentPageData = formatPageData({ pageData: data?.catalogPage, previousPage: searchResult });
      setSearchResult(currentPageData);
    }
  }, [data]);

  useEffect(() => {
    setSearchResult(undefined);
  }, [searchData.key]);

  useEffect(() => {
    onSearch({
      ...searchData,
      onSearchCallback: onCallSearch
    });
  }, [searchData.pointer]);

  const onItemTap = ({ item }: { item: CatalogItem }) => {
    const { itemid, title, mobileImage, summary, summaryFormat, viewUrl, itemType } = item;
    switch (itemType) {
      case learningItemEnum.Course: {
        navigation.navigate(NAVIGATION.FIND_LEARNING_OVERVIEW, {
          itemid,
          title,
          mobileImage,
          summary,
          summaryFormat,
          viewUrl,
          itemType
        });
        break;
      }
      case learningItemEnum.Resource:
      case learningItemEnum.Playlist: {
        navigation.navigate(NAVIGATION.FIND_LEARNING_WEBVIEW, {
          viewUrl,
          title:
            itemType == learningItemEnum.Resource
              ? translate("learning_items.resource")
              : itemType == learningItemEnum.Playlist && translate("learning_items.playlist")
        });
        break;
      }
      default: {
        break;
      }
    }
  };

  const learningItem = useCallback(
    ({ item }: { item: CatalogItem }) => <LearningItemTile item={item} onItemTap={() => onItemTap({ item })} />,
    []
  );

  return (
    <SafeAreaView style={findLearningStyles.mainWrapper} edges={["top"]}>
      <FlatList
        ListHeaderComponent={
          <>
            <FindLearningHeader
              onChangeText={text => setSearchData({ key: text })}
              onSearch={() => {
                setSearchResult(undefined);
                setSearchData({ ...searchData, pointer: 0 });
              }}
              findLeaningText={searchData.key}
              count={searchResult?.maxCount}
              onFocusText={() => {
                setSearchData({ key: searchData.key });
              }}
            />
            {error && (
              <MessageBar mode={"alert"} text={translate("general.error_unknown")} icon={"exclamation-circle"} />
            )}
          </>
        }
        ListFooterComponent={loading ? <SkeletonLoading /> : null}
        contentContainerStyle={findLearningStyles.listWrapper}
        data={searchResult?.items}
        renderItem={learningItem}
        numColumns={2}
        keyExtractor={(_, index) => index.toString()}
        onEndReached={() =>
          searchResult &&
          !searchResult.finalPage &&
          setSearchData({ ...searchData, pointer: searchResult.pointer ?? 0 })
        }
        ListEmptyComponent={
          (!loading && searchData.key === "" && searchData.pointer === 0 && <NoFindLearning />) || null
        }
      />
    </SafeAreaView>
  );
};

const SkeletonLoading = () => {
  return (
    <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
      {Array.from(Array(8)).map((_, i) => (
        <LearningItemTileSkeleton key={i} />
      ))}
    </View>
  );
};

const NoFindLearning = () => {
  return (
    <View style={findLearningStyles.noLearningItemContainer}>
      <Image source={Images.noCurrentLearning as ImageSourcePropType} />
      <Text style={findLearningStyles.noLearningItemsText}>{translate("find_learning.no_learning_items")}</Text>
    </View>
  );
};
export default FindLearning;
