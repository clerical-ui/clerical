mkdir downloaded || true; while read img; do; name=`echo "$img" | awk -F '/' '{print $NF}'`; echo $img; curl "$img" > "./downloaded/$name"; done
