<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:tei="http://www.tei-c.org/ns/1.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" exclude-result-prefixes="xs" version="2.0">
    <xsl:output method="html" indent="yes" encoding="UTF-8" omit-xml-declaration="yes"/>

    <!-- Strip spaces from all elements -->
    <xsl:strip-space elements="*"/>

    <!-- Load the scribes.xml document -->
    <xsl:variable name="scribesDoc" select="doc('../register/scribes.xml')" as="document-node()"/>
    <xsl:key name="handNotesById" match="tei:handNote" use="@xml:id"/>
    <xsl:key name="personById" match="tei:person" use="@xml:id"/>

    <xsl:template match="/">
        <div id="teiStructure" class="structure">
            <div class="accordion accordion-flush" id="accordionStructure">
                <xsl:apply-templates select="//tei:div[@type = 'toc']"/>
                <xsl:apply-templates select="//tei:div[@type = 'content']"/>
            </div>
        </div>
    </xsl:template>

    <!-- Exlcude fw, editorial comment, paratext, interrogation -->
    <xsl:template match="tei:fw"/>
    <xsl:template match="tei:note[@type = 'editorial-comment']"/>
    <xsl:template match="tei:div[@type = 'paratext']"/>
    <xsl:template match="tei:div[@type = 'interrogation' and tei:head//tei:label//tei:num]"/>


    <xsl:template match="tei:div[@type = 'toc']">
        <xsl:variable name="ms-id" select="/tei:TEI/@xml:id"/>
        <xsl:variable name="book-n" select="//tei:div[@type='book']/@n"/>
        
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#structureToc-{$ms-id}-{$book-n}" aria-expanded="false" aria-controls="structureToc-{$ms-id}-{$book-n}"> Capitula </button>
            </h2>
            <div id="structureToc-{$ms-id}-{$book-n}" class="accordion-collapse collapse">
                <div class="accordion-body">
                    <div class="dropdown dropdown-structure">
                        <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-plus-minus"/>
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <p class="ms-3" style="font-weight: bold;"><span lang="de">Spalten
                                ein-/ausblenden</span> <span lang="en">Show/hide columns</span></p>
                            <li>
                                <label class="dropdown-item"><input type="checkbox" class="form-check-input toggle-column" data-column="0" checked="true"> <span lang="de">Kapitel nach Handschrift</span>
                                    <span lang="en">Chapter after manuscript</span></input></label>
                            </li>
                            <li>
                                <label class="dropdown-item"><input type="checkbox" class="form-check-input toggle-column" data-column="1" checked="true"> <span lang="de">Laufende Nummer</span> <span lang="en">Sequence number</span></input></label>
                            </li>
                            <li>
                                <label class="dropdown-item"><input type="checkbox" class="form-check-input toggle-column" data-column="2" checked="true"> <span lang="de">Überlieferung</span> <span lang="en">Transmission</span></input></label>
                            </li>
                            <li>
                                <label class="dropdown-item"><input type="checkbox" class="form-check-input toggle-column" data-column="3" checked="true"> <span lang="de">Incipit</span> <span lang="en">Incipit</span></input></label>
                            </li>
                            <li>
                                <label class="dropdown-item"><input type="checkbox" class="form-check-input toggle-column" data-column="4" checked="true"> <span lang="de">Hand</span> <span lang="en">Hand</span></input></label>
                            </li>
                        </ul>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col" class="chapterNumber">
                                        <span lang="de">Kapitel nach Handschrift</span>
                                        <span lang="en">Chapter after manuscript</span>
                                    </th>
                                    <th scope="col" class="sequenceNumber">
                                        <span lang="de">Laufende Nummer</span>
                                        <span lang="en">Sequence number</span>
                                    </th>
                                    <th scope="col" class="transmission">
                                        <span lang="de">Überlieferung</span>
                                        <span lang="en">Transmission</span>
                                    </th>
                                    <th scope="col">
                                        <span lang="de">Incipit</span>
                                        <span lang="en">Incipit</span>
                                    </th>
                                    <th scope="col">
                                        <span lang="de">Hand</span>
                                        <span lang="en">Hand</span>
                                    </th>
                                </tr>
                            </thead>
                            <xsl:apply-templates/>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </xsl:template>

    <!-- exclude header text -->
    <xsl:template match="tei:div[@type = 'toc']/tei:head"/>


    <!-- Key for looking up handNote by @xml:id -->
    <xsl:key name="handNotesById" match="tei:handNote" use="@xml:id"/>
    <!-- Key for looking up person by @xml:id in scribes.xml -->
    <xsl:key name="personById" match="tei:person" use="@xml:id"/>

    <xsl:template match="tei:item">
        <xsl:variable name="filtered-text">
            <xsl:apply-templates select="node()[not(self::tei:label) and not(self::tei:pc)]"/>
        </xsl:variable>
        <!-- Normalize space and split the string into words -->
        <xsl:variable name="words" select="tokenize(normalize-space($filtered-text), '\s+')"/>
        <!-- andere files abfragen -->
        <xsl:variable name="documents" select="tokenize(@corresp, ' ')"/>

        <tr>
            <td>Kap. <xsl:value-of select=".//tei:label//tei:num"/> (<xsl:value-of select=".//tei:label//tei:num/@value"/>)</td>
            <td>
                <xsl:value-of select="./@n"/>
            </td>
            <td>
                <xsl:for-each select="$documents">
                  <xsl:variable name="documentPathOrig" select="substring-before(., '#')"/>
                  <xsl:variable name="elementId" select="substring-after(., '#')"/>
              
                  <!-- CASE 1: full path provided -->
                  <xsl:choose>
                    <xsl:when test="contains(., '.xml#')">
                      <xsl:variable name="documentPath" select="replace($documentPathOrig, '\.\./', '../mss/')"/>
                      <xsl:variable name="doc" select="doc($documentPath)"/>
                      <xsl:variable name="root" select="$doc"/>
                      <xsl:value-of select="$root//tei:msName[@type = 'sigle']"/>,
                      Kap. <xsl:value-of select="($root//*[@xml:id = $elementId]//tei:num)[1]"/> (N.
                      <xsl:value-of select="$root//*[@xml:id = $elementId]/@n"/>)
                    </xsl:when>
              
                    <!-- CASE 2: only #id given -->
                    <xsl:otherwise>
                      <xsl:variable name="id" select="$elementId"/>
                      <xsl:variable name="prefix">
                        <xsl:choose>
                          <xsl:when test="starts-with($id,'frankfurt-ub-b-50')">frankfurt-ub-b-50</xsl:when>
                          <xsl:when test="starts-with($id,'koeln-edd-c-')">koeln-edd-c-119</xsl:when>
                          <xsl:when test="starts-with($id,'vatican-bav-pal-lat-586')">vatican-bav-pal-lat-586</xsl:when>
                          <xsl:otherwise>bamberg-sb-c-6</xsl:otherwise>
                        </xsl:choose>
                      </xsl:variable>
              
                      <!-- extract book number from ID -->
                      <xsl:variable name="booknum" select="replace($id, '.*-(\d+)-.*', '$1')"/>
                      <xsl:variable name="documentPath" select="concat('../mss/', $prefix, '/', $prefix, '-', $booknum, '.xml')"/>
                      <xsl:variable name="doc" select="doc($documentPath)"/>
                      <xsl:variable name="root" select="$doc"/>
                      <xsl:value-of select="$root//tei:msName[@type = 'sigle']"/>,
                      Kap. <xsl:value-of select="($root//*[@xml:id = $elementId]//tei:num)[1]"/> (N.
                      <xsl:value-of select="$root//*[@xml:id = $elementId]/@n"/>)
                    </xsl:otherwise>
                  </xsl:choose>
              
                  <!-- separator -->
                  <xsl:if test="position() &lt; last()"> / </xsl:if>
                </xsl:for-each>
              </td>
            

            <td>
                <!-- Output the first three words --> <xsl:for-each select="$words[position() le 3]"> <xsl:if test="position() != 1"> <xsl:text> </xsl:text> </xsl:if> <xsl:value-of select="."/> </xsl:for-each>... </td>
            <td>
                <!-- Step 1: Get all hand IDs as strings -->
                <xsl:variable name="handIds" select="tokenize(@hand, '\s+')"/>

                <!-- Step 2: Select the corresponding <tei:handNote> elements directly -->
                <xsl:for-each select="                         for $id in $handIds                         return                             key('handNotesById', substring-after($id, '#'))">

                    <!-- Display hand note content -->
                    <xsl:apply-templates select="node() except tei:note"/>
                    <xsl:text> </xsl:text>

                    <!-- Get scribe -->
                    <xsl:if test="@scribeRef">
                        <xsl:variable name="scribeId" select="substring-after(@scribeRef, '#')"/>
                        <xsl:variable name="scribe" select="key('personById', $scribeId, $scribesDoc)"/>
                        <xsl:if test="$scribe">
                            <xsl:value-of select="$scribe/tei:name"/>
                            <xsl:text>, </xsl:text>
                            <xsl:value-of select="$scribe/tei:affiliation"/>
                        </xsl:if>
                    </xsl:if>
                </xsl:for-each>
            </td>
        </tr>
    </xsl:template>

    <!-- Do nothing for 'teiHeader', effectively excluding it from output -->
    <xsl:template match="tei:div[@type = 'content']">
        <xsl:variable name="ms-id" select="/tei:TEI/@xml:id"/>
        <xsl:variable name="book-n" select="//tei:div[@type='book']/@n"/>
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#structureCorpus-{$ms-id}-{$book-n}" aria-expanded="false" aria-controls="structureCorpus-{$ms-id}-{$book-n}"> Corpus </button>
            </h2>
            <div id="structureCorpus-{$ms-id}-{$book-n}" class="accordion-collapse collapse">
                <div class="accordion-body">
                    <div class="dropdown dropdown-structure">
                        <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-plus-minus"/>
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <p class="ms-3" style="font-weight: bold;"><span lang="de">Spalten
                                ein-/ausblenden</span> <span lang="en">Show/hide columns</span></p>
                            <li>
                                <label class="dropdown-item"><input type="checkbox" class="form-check-input toggle-column" data-column="0" checked="true"> <span lang="de">Kapitel nach Handschrift</span>
                                    <span lang="en">Chapter after manuscript</span></input></label>
                            </li>
                            <li>
                                <label class="dropdown-item"><input type="checkbox" class="form-check-input toggle-column" data-column="1" checked="true"> <span lang="de">Laufende Nummer</span> <span lang="en">Sequence number</span></input></label>
                            </li>
                            <li>
                                <label class="dropdown-item"><input type="checkbox" class="form-check-input toggle-column" data-column="2" checked="true"> <span lang="de">Überlieferung</span> <span lang="en">Transmission</span></input></label>
                            </li>
                            <li>
                                <label class="dropdown-item"><input type="checkbox" class="form-check-input toggle-column" data-column="3" checked="true"> <span lang="de">Rubrik</span> <span lang="en">Rubric</span></input></label>
                            </li>
                            <li>
                                <label class="dropdown-item"><input type="checkbox" class="form-check-input toggle-column" data-column="4" checked="true"> <span lang="de">Inskription</span> <span lang="en">Inscription</span></input></label>
                            </li>
                            <li>
                                <label class="dropdown-item"><input type="checkbox" class="form-check-input toggle-column" data-column="5" checked="true"> <span lang="de">Incipit</span> <span lang="en">Incipit</span></input></label>
                            </li>
                            <li>
                                <label class="dropdown-item"><input type="checkbox" class="form-check-input toggle-column" data-column="6" checked="true"> <span lang="de">Hand</span> <span lang="en">Hand</span></input></label>
                            </li>
                        </ul>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col" class="chapterNumber">
                                        <span lang="de">Kapitel nach Handschrift</span>
                                        <span lang="en">Chapter after manuscript</span>
                                    </th>
                                    <th scope="col" class="sequenceNumber">
                                        <span lang="de">Laufende Nummer</span>
                                        <span lang="en">Sequence number</span>
                                    </th>
                                    <th scope="col" class="transmission">
                                        <span lang="de">Überlieferung</span>
                                        <span lang="en">Transmission</span>
                                    </th>
                                    <th scope="col">
                                        <span lang="de">Rubrik</span>
                                        <span lang="en">Rubric</span>
                                    </th>
                                    <th scope="col">
                                        <span lang="de">Inskription</span>
                                        <span lang="en">Inscription</span>
                                    </th>
                                    <th scope="col">
                                        <span lang="de">Incipit</span>
                                        <span lang="en">Incipit</span>
                                    </th>
                                    <th scope="col">
                                        <span lang="de">Hand</span>
                                        <span lang="en">Hand</span>
                                    </th>
                                </tr>
                            </thead>
                            <xsl:apply-templates/>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </xsl:template>


    <!-- exclude abbr -->
    <xsl:template match="tei:abbr"/>
    <xsl:template match="tei:div[@type = 'interrogation' and tei:head//tei:label//tei:num]"/>

    <!-- Key for looking up handNote by @xml:id-->
    <xsl:key name="handNotesById" match="tei:handNote" use="@xml:id"/>
    <!-- Key for looking up scribe by @xml:id in scribes.xml -->
    <xsl:key name="personById" match="tei:person" use="@xml:id"/>


    <xsl:template match="tei:div[@type = 'chapter']">
        <!-- andere files abfragen -->
        <xsl:variable name="documents" select="tokenize(@corresp, ' ')"/>

        <xsl:variable name="filtered-text-incipit">
            <xsl:apply-templates select="./tei:p[not(self::tei:head/tei:label) and not(self::tei:pc) and not(self::tei:choice/tei:abbr)]"/>
        </xsl:variable>
        <!-- Normalize space and split the string into words -->
        <xsl:variable name="words-incipit" select="tokenize(normalize-space($filtered-text-incipit), '\s+')"/>

        <xsl:variable name="filtered-text-head">
            <xsl:apply-templates select="./tei:head[not(self::tei:label) and not(self::tei:pc)]"/>
        </xsl:variable>
        <!-- Normalize space and split the string into words -->
        <xsl:variable name="words-head" select="tokenize(normalize-space($filtered-text-head), '\s+')"/>

        <xsl:variable name="filtered-text-inscription">
            <xsl:apply-templates select="./tei:note[@type = 'inscription'][not(self::tei:label) and not(self::tei:pc)]"/>
        </xsl:variable>
        <!-- Normalize space and split the string into words -->
        <xsl:variable name="words-inscription" select="tokenize(normalize-space($filtered-text-inscription), '\s+')"/>

        <xsl:variable name="chapterLabel"> Kap. <xsl:value-of select="./tei:head//tei:label//tei:num"/> (<xsl:value-of select="./tei:head//tei:label//tei:num/@value"/>) </xsl:variable>

        <tr>
            <td>
                <xsl:value-of select="$chapterLabel"/>
            </td>
            <td>
                <xsl:value-of select="./@n"/>
            </td>
            <td>
                <xsl:for-each select="$documents">
                  <!-- split into path and element ID -->
                  <xsl:variable name="documentPathOrig" select="substring-before(., '#')"/>
                  <xsl:variable name="elementId" select="substring-after(., '#')"/>
              
                  <!-- CASE 1: full path provided -->
                  <xsl:choose>
                    <xsl:when test="contains(., '.xml#')">
                      <xsl:variable name="documentPath" select="replace($documentPathOrig, '\.\./', '../mss/')"/>
                      <xsl:variable name="doc" select="doc($documentPath)"/>
                      <xsl:variable name="root" select="$doc"/>
                      <xsl:value-of select="$root//tei:msName[@type = 'sigle']"/>,
                      Kap. <xsl:value-of select="($root//*[@xml:id = $elementId]//tei:num)[1]"/> (N.
                      <xsl:value-of select="$root//*[@xml:id = $elementId]/@n"/>)
                    </xsl:when>
              
                    <!-- CASE 2: only #id given -->
                    <xsl:otherwise>
                      <!-- manuscript prefix from ID -->
                      <xsl:variable name="id" select="$elementId"/>
                      <xsl:variable name="prefix">
                        <xsl:choose>
                          <xsl:when test="starts-with($id,'frankfurt-ub-b-50')">frankfurt-ub-b-50</xsl:when>
                          <xsl:when test="starts-with($id,'koeln-edd-c-')">koeln-edd-c-119</xsl:when>
                          <xsl:when test="starts-with($id,'vatican-bav-pal-lat-586')">vatican-bav-pal-lat-586</xsl:when>
                          <xsl:otherwise>bamberg-sb-c-6</xsl:otherwise>
                        </xsl:choose>
                      </xsl:variable>
              
                      <!-- extract book number from ID -->
                      <xsl:variable name="booknum" select="replace($id, '.*-(\d+)-.*', '$1')"/>
                      <xsl:variable name="documentPath" select="concat('../mss/', $prefix, '/', $prefix, '-', $booknum, '.xml')"/>
                      <xsl:variable name="doc" select="doc($documentPath)"/>
                      <xsl:variable name="root" select="$doc"/>
                      <xsl:value-of select="$root//tei:msName[@type = 'sigle']"/>,
                      Kap. <xsl:value-of select="($root//*[@xml:id = $elementId]//tei:num)[1]"/> (N.
                      <xsl:value-of select="$root//*[@xml:id = $elementId]/@n"/>)
                    </xsl:otherwise>
                  </xsl:choose>
             
                  <!-- separator -->
                  <xsl:if test="position() &lt; last()"> / </xsl:if>
                </xsl:for-each>
              </td>

            <td>
                <xsl:for-each select="$words-head">
                    <xsl:if test="position() != 1">
                        <xsl:text> </xsl:text>
                    </xsl:if>
                    <xsl:value-of select="."/>
                </xsl:for-each>
            </td>
            <td>
                <xsl:for-each select="$words-inscription">
                    <xsl:if test="position() != 1">
                        <xsl:text> </xsl:text>
                    </xsl:if>
                    <xsl:value-of select="."/>
                </xsl:for-each>
            </td>
            <td><!-- Output the first three words --> <xsl:for-each select="$words-incipit[position() le 3]"> <xsl:if test="position() != 1">
                <xsl:text> </xsl:text> </xsl:if> <xsl:value-of select="."/> </xsl:for-each>...</td>

            <!--HERE - ToDo: solve the issue of two values in @hand-->

            <td>
                <!-- Step 1: Get all hand IDs as strings -->
                <xsl:variable name="handIds" select="tokenize(@hand, '\s+')"/>

                <!-- Step 2: Select the corresponding <tei:handNote> elements directly -->
                <xsl:for-each select="                         for $id in $handIds                         return                             key('handNotesById', substring-after($id, '#'))">

                    <!-- Display hand note content -->
                    <xsl:apply-templates select="node() except tei:note"/>
                    <xsl:text> </xsl:text>

                    <!-- Get scribe -->
                    <xsl:if test="@scribeRef">
                        <xsl:variable name="scribeId" select="substring-after(@scribeRef, '#')"/>
                        <xsl:variable name="scribe" select="key('personById', $scribeId, $scribesDoc)"/>
                        <xsl:if test="$scribe">
                            <xsl:value-of select="$scribe/tei:name"/>
                            <xsl:text>, </xsl:text>
                            <xsl:value-of select="$scribe/tei:affiliation"/>
                            <xsl:text> </xsl:text>
                        </xsl:if>
                    </xsl:if>

                </xsl:for-each>
            </td>
        </tr>

        <!-- Process child <div type="interrogation"> elements -->
        <xsl:for-each select="tei:div[@type = 'interrogation']">
            <xsl:variable name="interrogationLabel"> Int. <xsl:value-of select="./tei:label//tei:num"/> (<xsl:value-of select="./tei:label//tei:num/@value"/>) </xsl:variable>

            <xsl:variable name="interrogation-text-incipit">
                <xsl:apply-templates select="./tei:p[not(self::tei:label) and not(self::tei:pc)]"/>
            </xsl:variable>
            <!-- Normalize space and split the string into words -->
            <xsl:variable name="interrogationIncipit" select="tokenize(normalize-space($interrogation-text-incipit), '\s+')"/>

            <xsl:variable name="interrogation-text-head">
                <xsl:apply-templates select="./tei:label[not(self::tei:pc)]"/>
            </xsl:variable>
            <!-- Normalize space and split the string into words -->
            <xsl:variable name="interrogationHead" select="tokenize(normalize-space($interrogation-text-head), '\s+')"/>

            <tr>
                <td>
                    <xsl:value-of select="$interrogationLabel"/>
                </td>
                <td>
                    <xsl:value-of select="./@n"/>
                </td>
                <td>
                    <!-- TODO transmission interrogations -->
                </td>
                <td>
                    <!-- rubric -->
                    <xsl:for-each select="$interrogationHead">
                        <xsl:if test="position() != 1">
                            <xsl:text> </xsl:text>
                        </xsl:if>
                        <xsl:value-of select="."/>
                    </xsl:for-each>
                </td>
                <td><!-- inscription NO  --></td>
                <td><!-- incipit  --> <xsl:for-each select="$interrogationIncipit[position() le 3]">
                    <xsl:if test="position() != 1"> <xsl:text> </xsl:text> </xsl:if> <xsl:value-of select="."/> </xsl:for-each>... </td>
                <td>
                    <!-- Step 1: Get all hand IDs as strings -->
                    <xsl:variable name="handIds" select="tokenize(@hand, '\s+')"/>

                    <!-- Step 2: Select the corresponding <tei:handNote> elements directly -->
                    <xsl:for-each select="for $id in $handIds return key('handNotesById', substring-after($id, '#'))">

                        <!-- Display hand note content -->
                        <xsl:apply-templates select="node() except tei:note"/>
                        <xsl:text> </xsl:text>

                        <!-- Get scribe -->
                        <xsl:if test="@scribeRef">
                            <xsl:variable name="scribeId" select="substring-after(@scribeRef, '#')"/>
                            <xsl:variable name="scribe" select="key('personById', $scribeId, $scribesDoc)"/>
                            <xsl:if test="$scribe">
                                <xsl:value-of select="$scribe/tei:name"/>
                                <xsl:text>, </xsl:text>
                                <xsl:value-of select="$scribe/tei:affiliation"/>
                                <xsl:text> </xsl:text>
                            </xsl:if>
                        </xsl:if>

                    </xsl:for-each>
                </td>
            </tr>
        </xsl:for-each>
    </xsl:template>

    <xsl:template match="tei:div[@type = 'praefatiuncula']"/>

    <xsl:template match="tei:head/tei:label"/>

    <xsl:template match="tei:seg"/>

    <xsl:template match="tei:choice">
        <xsl:text> </xsl:text>
        <!-- Add space before choice content -->
        <xsl:apply-templates/>
        <xsl:text> </xsl:text>
        <!-- Add space after choice content -->
    </xsl:template>

    <xsl:template match="tei:teiHeader">
        <xsl:apply-templates select="tei:fileDesc/tei:sourceDesc/tei:msDesc/tei:physDesc/tei:handDesc"/>
    </xsl:template>

    <!-- Key for looking up scribe by @xml:id in scribes.xml -->
    <xsl:key name="personById" match="tei:person" use="@xml:id"/>
    <!-- Key for looking up bibliographic info by xml:id -->
    <xsl:key name="biblById" match="tei:biblStruct" use="@xml:id"/>
</xsl:stylesheet>