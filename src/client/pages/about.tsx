import type { FC } from "react";
import { Image } from "@components/image";
import { PageTitle } from "@/components/page-title";
import { DocumentTitle } from "@/components/document-title";

export const About: FC = () => {
  return (
    <>
      <DocumentTitle text="About" />
      <PageTitle>About us</PageTitle>
      <div className="row">
        <div className="col">
          <p>
            Ut non consequatur aperiam ex dolores. Voluptatum harum consequatur
            est totam. Aut voluptatum aliquid aut optio et ea. Quaerat et
            eligendi minus quasi. Culpa voluptatem voluptatem dolores molestiae
            aut quos iure. Repellat aperiam ut aliquam iure. Veritatis magnam
            quisquam et dolorum recusandae aut.
          </p>
          <Image className="w-25 mb-4" />
          <p>
            Molestias inventore illum architecto placeat molestias ipsam facilis
            ab quo. Rem dolore cum qui est reprehenderit assumenda voluptatem
            nisi ipsa. Unde libero quidem. Excepturi maiores vel quia. Neque
            facilis nobis minus veniam id. Eum cum eveniet accusantium molestias
            voluptas aut totam laborum aut. Ea molestiae ullam et. Quis ea ipsa
            culpa eligendi ab sit ea error suscipit. Quia ea ut minus distinctio
            quam eveniet nihil. Aut voluptate numquam ipsa dolorem et quas nemo.
          </p>
          <p>
            Pariatur nisi nobis hic ut facilis sunt rerum id error. Soluta nihil
            quisquam quia rerum illo. Ipsam et suscipit est iure incidunt quasi
            et eum. Culpa libero dignissimos recusandae. In magni sapiente non
            voluptas molestias. Deserunt quos quo placeat sunt. Ea
            necessitatibus dolores eaque ex aperiam sunt eius. Saepe aperiam
            aut. Quaerat natus consequatur aut est id saepe et aut facilis.
          </p>
        </div>
      </div>
    </>
  );
};
