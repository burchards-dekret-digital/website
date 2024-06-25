<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:tei="http://www.tei-c.org/ns/1.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" exclude-result-prefixes="xs" version="2.0">
    <xsl:output method="html" indent="yes" encoding="UTF-8" omit-xml-declaration="yes"/>
   
    <!-- Strip spaces from all elements -->
    <xsl:strip-space elements="*"/>
   
    <xsl:template match="/">
        <div id="teiStructure" class="structure">
            <div class="accordion accordion-flush" id="accordionStructure">
                <xsl:apply-templates/>
            </div>
        </div>
    </xsl:template>
    
    <!-- Only process child elements of 'body' from 'TEI' -->
    <xsl:template match="tei:TEI">
        <xsl:apply-templates select="tei:text/tei:body/*"/>
    </xsl:template>
    
    <!-- Do nothing for 'teiHeader', effectively excluding it from output -->
    <xsl:template match="tei:teiHeader"/>

    <!-- Exlcude fw -->
    <xsl:template match="tei:fw"/>

    <!-- Do nothing for 'teiHeader', effectively excluding it from output -->
    <xsl:template match="tei:div[@type='toc']">
        
        <!--<xsl:variable name="transmission" select="document('../../../../collections/bdd/data/register/scribes.xml')"/>-->
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#structureToc" aria-expanded="false" aria-controls="structureToc">
                  Capitula
                </button>
              </h2>
              <div id="structureToc" class="accordion-collapse collapse">
                <div class="accordion-body">
                    <div class="dropdown dropdown-structure">
                  <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                      <i class="fa-solid fa-plus-minus"/>
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                     <p class="ms-3" style="font-weight: bold;">Spalten ein-/ausblenden</p>
                    <li>
                      <label class="dropdown-item"><input type="checkbox" class="form-check-input toggle-column" data-column="0" checked="true"> Kapitel nach Handschrift</input></label>
                    </li>
                    <li>
                      <label class="dropdown-item"><input type="checkbox" class="form-check-input toggle-column" data-column="1" checked="true"> Laufende Nummer</input></label>
                    </li>
                    <li>
                      <label class="dropdown-item"><input type="checkbox" class="form-check-input toggle-column" data-column="2" checked="true"> Überlieferung</input></label>
                    </li>
                    <li>
                      <label class="dropdown-item"><input type="checkbox" class="form-check-input toggle-column" data-column="3" checked="true"> Incipit</input></label>
                    </li>
                  </ul>
               </div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Kapitel nach Handschrift</th>
                                <th scope="col">Laufende Nummer</th>
                                <th scope="col">Überlieferung</th>
                                <th scope="col">Incipit</th>
                            </tr>
                        </thead>
                        <xsl:apply-templates/>
                    </table>
                </div>
              </div>
            </div>
    </xsl:template>

    <!-- exclide header text -->
    <xsl:template match="tei:div[@type='toc']/tei:head"/>
        

    <xsl:template match="tei:item">
        <xsl:variable name="filtered-text">
            <xsl:apply-templates select="node()[not(self::tei:label) and not(self::tei:pc) and not(self::tei:choice/tei:abbr)]"/>
        </xsl:variable>

        <!-- Normalize space and split the string into words -->
        <xsl:variable name="words" select="tokenize(normalize-space($filtered-text), '\s+')"/>
        
        <!-- andere files abfragen -->
        <xsl:variable name="documents" select="tokenize(@corresp, ' ')"/>

        <tr>
            <td>Kap. <xsl:value-of select=".//tei:num"/> (<xsl:value-of select=".//tei:num/@value"/>)</td>
            <td><xsl:value-of select="./@n"/></td>
            <td>
                <xsl:for-each select="$documents">
                    <!-- Load the document -->
                    <xsl:variable name="documentPathOrig" select="substring-before(., '#')"/>
                    <xsl:variable name="documentPath" select="replace($documentPathOrig,'\.\./','../mss/')"/>
                    <xsl:variable name="elementId" select="substring-after(., '#')"/>
                    <!-- Load the document -->
                    <xsl:variable name="doc" select="doc($documentPath)"/>
                    <!-- Fetch the specific element by ID -->
                    <xsl:variable name="root" select="$doc"/>
                    <xsl:value-of select="$root//tei:msName[@type='sigle']"/>, Kap. <xsl:value-of select="$root//*[@xml:id=$elementId]//tei:num"/> (N. <xsl:value-of select="$root//*[@xml:id=$elementId]/@n"/>)
                     <xsl:if test="position() &lt; last()"> / </xsl:if>
                </xsl:for-each>
            </td>
            <td>
                <!-- Output the first three words -->
                <xsl:for-each select="$words[position() le 3]">
                    <xsl:if test="position() != 1">
                    <xsl:text> </xsl:text>
                    </xsl:if>
                    <xsl:value-of select="."/>
                </xsl:for-each>...
            </td>
        </tr>
    </xsl:template>
    
    <!-- Do nothing for 'teiHeader', effectively excluding it from output -->
    <xsl:template match="tei:div[@type='content']">
               
        
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#structureCorpus" aria-expanded="false" aria-controls="structureCorpus">
                  Corpus
                </button>
              </h2>
              <div id="structureCorpus" class="accordion-collapse collapse">
                <div class="accordion-body">
                    <div class="dropdown dropdown-structure">
                        <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-plus-minus"/>
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                           <p class="ms-3" style="font-weight: bold;">Spalten ein-/ausblenden</p>
                          <li>
                            <label class="dropdown-item"><input type="checkbox" class="form-check-input toggle-column" data-column="0" checked="true"> Kapitel nach Handschrift</input></label>
                          </li>
                          <li>
                            <label class="dropdown-item"><input type="checkbox" class="form-check-input toggle-column" data-column="1" checked="true"> Laufende Nummer</input></label>
                          </li>
                          <li>
                            <label class="dropdown-item"><input type="checkbox" class="form-check-input toggle-column" data-column="2" checked="true"> Überlieferung</input></label>
                          </li>
                          <li>
                           <label class="dropdown-item"><input type="checkbox" class="form-check-input toggle-column" data-column="3" checked="true"> Rubrik</input></label>
                         </li>
                         <li>
                           <label class="dropdown-item"><input type="checkbox" class="form-check-input toggle-column" data-column="4" checked="true"> Inskription</input></label>
                         </li>
                          <li>
                            <label class="dropdown-item"><input type="checkbox" class="form-check-input toggle-column" data-column="5" checked="true"> Incipit</input></label>
                          </li>
                        </ul>
                     </div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Kapitel nach Handschrift</th>
                                <th scope="col">Laufende Nummer</th>
                                <th scope="col">Überlieferung</th>
                                <!--<th scope="col">Incipit</th>
                                <th scope="col">Rubrik</th>
                                <th scope="col">Inskription</th>-->
                                
                                <th scope="col">Rubrik</th>
                                <th scope="col">Inskription</th>
                                <th scope="col">Incipit</th>
                            </tr>
                        </thead>
                        <xsl:apply-templates/>
                    </table>
                </div>
              </div>
            </div>
        
    </xsl:template>

        <!-- exclude abbr -->
    <xsl:template match="tei:abbr"/>

        <!-- exclide header text -->
    <xsl:template match="tei:div[@type='chapter']">
        <!-- andere files abfragen -->
        <xsl:variable name="documents" select="tokenize(@corresp, ' ')"/>
        
        <!-- get incipit -->
        <xsl:variable name="filtered-text-incipit">
            <xsl:apply-templates select="./tei:p[not(self::tei:head/tei:label) and not(self::tei:pc) and not(self::tei:choice/tei:abbr)]"/>
        </xsl:variable>

        <!-- Normalize space and split the string into words -->
        <xsl:variable name="words-incipit" select="tokenize(normalize-space($filtered-text-incipit), '\s+')"/>
        
        <!-- get head-->
        <xsl:variable name="filtered-text-head">
            <xsl:apply-templates select="./tei:head[not(self::tei:label) and not(self::tei:pc) and not(self::tei:choice/tei:abbr)]"/>
        </xsl:variable>

        <!-- Normalize space and split the string into words -->
        <xsl:variable name="words-head" select="tokenize(normalize-space($filtered-text-head), '\s+')"/>
                
        <!-- get inscription-->
        <xsl:variable name="filtered-text-inscription">
            <xsl:apply-templates select="./tei:note[@type='inscription'][not(self::tei:label) and not(self::tei:pc) and not(self::tei:choice/tei:abbr)]"/>
        </xsl:variable>

        <!-- Normalize space and split the string into words -->
        <xsl:variable name="words-inscription" select="tokenize(normalize-space($filtered-text-inscription), '\s+')"/>


        <tr>
            <td>Kap. <xsl:value-of select="./tei:head/tei:label/tei:num"/> (<xsl:value-of select="./tei:head/tei:label//tei:num/@value"/>)</td>
            <td><xsl:value-of select="./@n"/></td>
            <td>
                <xsl:for-each select="$documents">
                    <!-- Load the document -->
                    <xsl:variable name="documentPathOrig" select="substring-before(., '#')"/>
                    <xsl:variable name="documentPath" select="replace($documentPathOrig,'\.\./','../mss/')"/>
                    <xsl:variable name="elementId" select="substring-after(., '#')"/>
                    <!-- Load the document -->
                    <xsl:variable name="doc" select="doc($documentPath)"/>
                    <!-- Fetch the specific element by ID -->
                    <xsl:variable name="root" select="$doc"/>
                    <xsl:value-of select="$root//tei:msName[@type='sigle']"/>, Kap. <xsl:value-of select="$root//*[@xml:id=$elementId]/tei:head/tei:label/tei:num"/> (N. <xsl:value-of select="$root//*[@xml:id=$elementId]/@n"/>)
                     <xsl:if test="position() &lt; last()"> / </xsl:if>
                </xsl:for-each>
            </td>
            
            <td><xsl:for-each select="$words-head">
                    <xsl:if test="position() != 1">
                    <xsl:text> </xsl:text>
                    </xsl:if>
                    <xsl:value-of select="."/>
                </xsl:for-each></td>
            <td><xsl:for-each select="$words-inscription">
                    <xsl:if test="position() != 1">
                    <xsl:text> </xsl:text>
                    </xsl:if>
                    <xsl:value-of select="."/>
                </xsl:for-each></td>
            <td><!-- Output the first three words -->
                <xsl:for-each select="$words-incipit[position() le 3]">
                    <xsl:if test="position() != 1">
                    <xsl:text> </xsl:text>
                    </xsl:if>
                    <xsl:value-of select="."/>
                </xsl:for-each>...</td>
            
        </tr>
    </xsl:template>
    
       <xsl:template match="tei:div[@type='praefatiuncula']">
       </xsl:template>
    
    <xsl:template match="tei:head/tei:label"/>
    
        <xsl:template match="tei:choice">
        <xsl:text> </xsl:text> <!-- Add space before choice content -->
        <xsl:apply-templates/>
        <xsl:text> </xsl:text> <!-- Add space after choice content -->
    </xsl:template>

</xsl:stylesheet>